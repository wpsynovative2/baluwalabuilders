/**
 * Baluwala Builders – website enquiries → Google Sheet.
 *
 * Setup (see README.md → "Google Sheet setup" for the full walkthrough):
 *   1. Open the Google Sheet that should receive leads.
 *   2. Extensions → Apps Script, paste this file, and set SHARED_SECRET below
 *      to the same value as GOOGLE_SCRIPT_SECRET in the website's .env.local.
 *   3. Deploy → New deployment → Web app → Execute as "Me",
 *      Who has access "Anyone". Copy the /exec URL into GOOGLE_SCRIPT_URL.
 *
 * After editing this file, use Deploy → Manage deployments → Edit → "New version"
 * so the existing URL keeps working.
 */

var SHEET_NAME = 'Enquiries';
var SHARED_SECRET = 'change-me-to-a-long-random-string';
// Every new enquiry is also emailed here. Set to '' to turn emails off.
var NOTIFY_EMAIL = 'sales@baluwalabuilders.com';
var HEADERS = ['Timestamp', 'Name', 'Mobile Number', 'Email', 'Interested In', 'Form', 'Page'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.secret !== SHARED_SECRET) return respond({ ok: false, error: 'unauthorized' });
    if (!data.name || !data.phone) return respond({ ok: false, error: 'name and phone are required' });

    // Serialise writes so two simultaneous enquiries cannot overwrite each other.
    lock.waitLock(20000);

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd-MMM-yyyy HH:mm:ss'),
      safe(data.name),
      safe(data.phone),
      safe(data.email),
      safe(data.interest),
      safe(data.source),
      safe(data.page),
    ]);
    notify(data);
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Emails the lead to NOTIFY_EMAIL. The row is already saved by this point, so
// a mail failure (e.g. the daily quota) is logged instead of failing the enquiry.
function notify(data) {
  if (!NOTIFY_EMAIL) return;
  try {
    var lines = [
      'Name: ' + data.name,
      'Mobile: ' + data.phone,
      'Email: ' + (data.email || '-'),
      'Interested in: ' + (data.interest || '-'),
      'Form: ' + (data.source || '-'),
      'Page: ' + (data.page || '-'),
    ];
    var options = { name: 'Baluwala Builders Website' };
    // Lets the sales team reply straight to the visitor.
    if (data.email) options.replyTo = data.email;
    MailApp.sendEmail(
      NOTIFY_EMAIL,
      'New website enquiry – ' + data.name + ' (' + data.phone + ')',
      lines.join('\n'),
      options
    );
  } catch (err) {
    console.error('Enquiry email failed: ' + err);
  }
}

// Stores every value as plain text. The leading apostrophe keeps phone numbers
// such as "+9198…" intact and stops a value starting with "=" from running as
// a formula.
function safe(value) {
  var text = String(value == null ? '' : value).trim();
  return text ? "'" + text : '';
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

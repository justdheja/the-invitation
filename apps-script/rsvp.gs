/**
 * RSVP webhook — Google Apps Script Web App.
 *
 * Receives RSVP submissions (as JSON) from the wedding invitation site and
 * appends each one as a new row in a Google Sheet.
 *
 * DEPLOYMENT:
 *   1. Create (or open) the Google Sheet you want RSVP responses saved to.
 *   2. In the Sheet, go to Extensions > Apps Script.
 *   3. Delete any starter code and paste in this entire file.
 *   4. Click Deploy > New deployment.
 *      - Select type: "Web app".
 *      - Execute as: "Me".
 *      - Who has access: "Anyone".
 *   5. Click Deploy, authorize the script when prompted.
 *   6. Copy the Web app URL (ends in /exec).
 *   7. Paste that URL into VITE_RSVP_WEBHOOK_URL in your .env file.
 *
 * If a sheet/tab named "RSVP" exists in the spreadsheet, rows are appended
 * there; otherwise the first (active) sheet is used. On first run, a header
 * row is added automatically if the sheet is empty.
 */

const HEADERS = ['submittedAt', 'slug', 'name', 'phone', 'attending', 'guestCount', 'message']

function getTargetSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const named = ss.getSheetByName('RSVP')
  return named || ss.getSheets()[0]
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = getTargetSheet_()
    ensureHeaderRow_(sheet)

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.slug || '',
      data.name || '',
      data.phone || '',
      data.attending || '',
      data.guestCount ?? '',
      data.message || '',
    ])

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

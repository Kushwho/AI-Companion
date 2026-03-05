// ============================================================
// Sakhi Waitlist — Google Apps Script
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1hcwKaiHpLB7YVZMxW_XkKiXeFgYfj8VNpX8_n6UCMmo/edit
// 2. Go to Extensions → Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Click "Deploy" → "New deployment"
// 5. Choose type: "Web app"
// 6. Set "Execute as": Me
// 7. Set "Who has access": Anyone
// 8. Click "Deploy" and copy the Web App URL
// 9. Paste the URL into sakhi-landing-v4.html where it says PASTE_YOUR_APPS_SCRIPT_URL_HERE
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Parent Name', 'Child Age', 'City', 'Language', 'Email']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.age || '',
      data.city || '',
      data.language || '',
      data.email || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Sakhi Waitlist API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

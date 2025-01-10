// function getDoc() {
//     var doc = DocumentApp.openById("1sueQd1FoWbbv5_Q8WJzvzTlrCphgaTiHoVsrg45jV6o");
//     var body = doc.getBody();
//     return body.getText();
// }

// function printDocLines() {
//     var doc = DocumentApp.openById("1sueQd1FoWbbv5_Q8WJzvzTlrCphgaTiHoVsrg45jV6o");
//     var body = doc.getBody();
//     var lines = body.getText().split('\n');
//     for (var i = 0; i < lines.length; i++) {
//         Logger.log(lines[i]);
//     }
// }

// function main() {
//     Logger.log(getDoc());
//     printDocLines();
// }
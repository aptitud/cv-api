const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx')

module.exports = async cv => {
  const doc = new Document()
  doc.addSection({
    children: [
      new Paragraph({
        children: [new TextRun(cv.name)],
        heading: HeadingLevel.HEADING_1,
      }),
    ],
  })
  return Packer.toBuffer(doc).then(x => Buffer.from(x))
}

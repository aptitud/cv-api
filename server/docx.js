const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx')

module.exports = async cv => {
  const doc = new Document({
    styles,
  })
  const introductionParagraphs = cv.introduction
    .split('\n')
    .filter(x => Boolean(x.trim()))
  doc.addSection({
    children: [
      new Paragraph({
        children: [new TextRun(cv.name)],
        heading: HeadingLevel.HEADING_1,
      }),
      ...introductionParagraphs.map(
        x =>
          new Paragraph({
            children: [new TextRun(x)],
          }),
      ),
    ],
  })
  return Packer.toBuffer(doc).then(x => Buffer.from(x))
}

const styles = {
  paragraphStyles: [
    {
      id: 'Normal',
      name: 'Normal',
      quickFormat: true,
      paragraph: {
        spacing: {
          after: 200,
          line: 276,
        },
      },
    },
  ],
}

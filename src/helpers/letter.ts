export const Modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    [{ align: ['', 'right', 'center'] }],
    [
      // ['link' /*'image' 'video'*/],
      'clean'
    ]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
  // imageResize: {
  //   displaySize: true,
  // },
}

export const Formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  // 'link',
  // 'image',
  // 'video',
  'color',
  'align'
]

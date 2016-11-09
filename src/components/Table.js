def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get tagName() { return 'table'; }
  get caption() {
    let { depot = window.depot } = this;
    let { scheme } = depot;
    let { caption, captionType = 'table' } = scheme;
    let value;
    if (captionType === 'table' && scheme.caption) {
      value = new TableCaption({ depot }).to(this);
    }
    Object.defineProperty(this, 'caption', { value, configurable: true });
    return value;
  }
  get head() {
    let { depot = window.depot } = this;
    let value = new TableHead({ depot }).to(this);
    Object.defineProperty(this, 'head', { value, configurable: true });
    return value;
  }
  render(list) {
    let { depot = window.depot } = this;
    let { scheme } = depot;
    if (!(list instanceof Array)) return console.error('Resumt must be a list');
    let rows = list.map(fieldMap => new TableRow({ fieldMap, depot }));
    Promise.all(rows.map(row => row.$promise)).then(rows => {
      void this.caption;
      void this.head;
      rows.forEach(row => row.to(this));
    });
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        border: 1px solid #EFF2F7;
        font-size: 13px;
        line-height: 40px;
        margin: 1em;
        background: #fff;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});

def((Item, TableCell) => class extends Item {
  get tagName() { return 'tr'; }
  get $promise() {
    let resolve, reject;
    let value = new Promise((...args) => [ resolve, reject ] = args);
    value.resolve = resolve;
    value.reject = reject;
    Object.defineProperty(this, '$promise', { value, configurable: true });
    return value;
  }
  init() {
    let { depot = window.depot } = this;
    let { fieldMap } = this;
    let { fields = [], actions = [] } = depot.scheme;
    let cells = fields.map(field => new TableCell(field, { value: fieldMap[field.key] }, this));
    Promise.all(cells.map(cell => cell.$promise)).then(cells => {
      cells.forEach(cell => cell.to(this));
      if (actions.length) new TableCell({ actions, align: 'right' }, this).to(this);
      this.$promise.resolve(this);
    });
  }
  get styleSheet() {
    return `
      :scope:hover {
        background: #f9fafc;
        transition: background 200ms ease;
      }
    `;
  }
});

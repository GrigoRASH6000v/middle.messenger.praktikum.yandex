import Block from '../../../modules/block.js';

class TestComponents extends Block {
  constructor(props) {
    super('button', props);
  }
  render() {
    return this.props.text;
  }
}

let testComponent = new TestComponents({
  text: 'Заебок!!',
});

export default testComponent;

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import '../index.css';

class Field extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  state = {
    content: this.props.sdk.entry.fields.images.getValue() || []
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onButtonClick = async (payload) => {
    await this.props.sdk.dialogs.openExtension({
      width: 1400,
      title: 'Unsplash Stock',
      parameters: {images: payload}
    })
    .then(data => {
      data.map(el => {
        this.setState(prevState => ({
          content: [...prevState.content, el]
        }))
      })
    })
  }

  deleteImage = (img) => {
    this.setState(({ content }) => ({
      content: content.filter(el => el.id !== img.id)
    }))
    this.props.sdk.entry.fields.images.setValue(this.state.content);
  }

  listItem = () => {
    this.props.sdk.entry.fields.images.setValue(this.state.content);
    return this.state.content.map((el, index) => {
      return(
        <Col key={ index }>
          <div className="imageBox" style={{ background: `url("${el.url}") no-repeat center center` }}><span className="delete" onClick={ () => this.deleteImage(el) }>X</span></div>
        </Col>
      )
    })
  }

  render() {
    return (
      <Container fluid={ true }>
        <Row>
          { this.listItem() }
        </Row>

        <Button
          buttonType="positive"
          isFullWidth={true}
          testId="open-dialog"
          onClick={() => this.onButtonClick(this.state.content)}>
          Add Images from Unsplash
        </Button>
      </Container>
    );
  }
}

export default Field

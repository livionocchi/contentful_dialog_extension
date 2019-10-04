import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@contentful/forma-36-react-components'
import { Container, Row, Col } from 'react-bootstrap'
import '@contentful/forma-36-react-components/dist/styles.css'
import '../index.css'
import axios from 'axios'

class Dialog extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  state = {
    content: [],
    selected: []
  }

  componentDidMount = () => {
    axios.get('https://api.unsplash.com/photos/?client_id=0fb0b0390f0213de08f71983589722b51c5de9051c14d81c1de778484442174e')
    .then(res => res.data.reduce((acc, cur) => {
        let newPic = this.props.sdk.parameters.invocation.images.find(el => el.id === cur.id);
        if(!newPic) {
          acc.push(cur);
          return acc
        }
        return acc
      }, [])
    )
    .then(res => {
      this.setState({ content: [...res] })
    })
  }

  handleClick = (url, id) => {
    if(!this.state.selected.find(el => el.id === id)) {
      this.setState(prevState => ({
        selected: [...prevState.selected, {url, id}]
      })
    )
    } else {
      this.setState(({ selected}) => ({
        selected: selected.filter(el => el.id !== id)
      })
    )}
  }

  contentTypes = () => {
    if(this.state.content.length !== 0) {
      return this.state.content.map((el, index) => {
        return (
          <Col key={ index }>
            <div
            className={`imageBox ${ this.state.selected.find(x => x.id === el.id ) ? 'selected' : '' }`}
            onClick={ () => this.handleClick(el.urls.small, el.id) }
            style={{ background: `url("${el.urls.small}") no-repeat center center` }}></div>
          </Col>
        )
      })
    }
  }

  render() {
    return (
      <Container fluid={ true }>
        <Row>
          { this.contentTypes() }
        </Row>

        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close(this.state.selected);
          }}>
          Save
        </Button>
      </Container>
    );
  }
}

export default Dialog

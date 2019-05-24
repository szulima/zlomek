import PropTypes from 'prop-types';
import './App.css';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Skup złomu MAPOL'
      inverted
      style={{
        fontSize: mobile ? '2.5em' : '4em',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: mobile ? '2em' : '3em',        
      }}
    />
    <Header
      as='h2'
      content='Skawina, Kraków i okolice'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'bold',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button as='a' href='#o-firmie' color='orange' size='big'>
      Dowiedz się więcej
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              color={fixed ? 'red' : 'white'}
              size={fixed ?  'normal' : 'huge'}
              borderless
              style={fixed ? null : {backgroundColor: 'rgba(256,256,256,0)', color: 'white'}}
            >
              <Container>
                <Menu.Item as='a' href='#o-firmie'>O firmie</Menu.Item>
                <Menu.Item as='a' href='#jak-trafic'>Jak trafić</Menu.Item>
                <Menu.Item as='a' href='#dlaczego-MAPOL'>Dlaczego MAPOL?</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' href='#kontakt' color='orange'>Kontakt</Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' href='#o-firmie'>O firmie</Menu.Item>
          <Menu.Item as='a' href='#jak-trafic'>Jak trafić</Menu.Item>
          <Menu.Item as='a' href='#dlaczego-MAPOL'>Dlaczego MAPOL?</Menu.Item>
          <Menu.Item as='a' href='#kontakt'>Kontakt</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
            className='bg-image'
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' href='#kontakt' color='orange'>
                    Kontakt
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical id='o-firmie'>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              O firmie
            </Header>
            <p style={{ fontSize: '1.33em' }}>
             MAPOL to rodzinna firma założona w x roku, mająca siedzibę w Skawinie. Skupujemy złom wszelkiego rodzaju. Quam et in omnis qui est eum. Aliquid aut deserunt fuga est quia cupiditate. Deleniti dolorem porro exercitationem sequi.
            </p>
            <p style={{ fontSize: '1.33em' }}>
            Perferendis neque distinctio ea dolorem molestias non sed. Ducimus quasi deserunt mollitia eligendi quo odio eos. Quis aut soluta recusandae et. Ut voluptates aut cum exercitationem et facere saepe eius.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='./assets/header-sepia.jpg' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted style={{ padding: '4em 0em' }} vertical id='kontakt'>
      <Container text style={{color:'white', letterSpacing: 1.5}} textAlign='center'>
        <Header style={{color:'white'}} >
          <Icon name='phone' size='big' flipped='horizontally' circular inverted color='orange'/>
          SPRAWDŹ AKTUALNE CENY:
        </Header>
        <Header style={{color:'white', letterSpacing: 2, fontSize:'2em'}}>696 171 183</Header>
        <Header style={{color:'white', letterSpacing: 2, fontSize:'2em'}}>604 994 446</Header>
      </Container>
    </Segment>
    <Segment style={{ padding: '20em 8em 4em 8em' }} vertical id='jak-trafic'>
      <Grid columns='three' stackable textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '1.5em'}}>
              <Icon name='home' size='tiny'/>
              Adres:
            </Header>
            <List style={{fontSize: '1.1em'}}>
              <List.Item>F.H.U. MAPOL Maciej Polek</List.Item>
              <List.Item>ul. Piłsudskiego 7</List.Item>
              <List.Item>32-050 Skawina</List.Item>
            </List>
            <Button size='small'>
              <a target="_blank" rel="noopener noreferrer" href='https://www.google.com/maps/place/SKUP+ZŁOMU+F.H.U+"MAPOL"/@49.9726156,19.8083925,15z/data=!4m5!3m4!1s0x0:0xfeabd5dbda18f75a!8m2!3d49.9726156!4d19.8083925' style={{color: 'black'}}>
                Sprawdź trasę w Google Maps
              </a>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '1.5em'}}>
              <Icon name='phone' flipped='horizontally' size='tiny'/>
              Kontakt:
            </Header>
            <List style={{fontSize: '1.1em'}}>
              <List.Item>696 171 183</List.Item>
              <List.Item>604 994 446</List.Item>
              <List.Item>e-mail: ?</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '1.5em'}}>
              <Icon name='clock' flipped='horizontally' size='tiny'/>
              Godziny otwarcia:
            </Header>
            <List style={{fontSize: '1.1em'}}>
              <List.Item>poniedziałek - piątek: 8:00-17:00</List.Item>
              <List.Item>sobota: 8:00-14:00</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '7em 10em' }} vertical id='dlaczego-MAPOL'>
      <Grid columns='equal' stackable>
        <Grid.Row textAlign='center' style={{ paddingBottom:'2em' }}>
          <Grid.Column >
            <Header as='h3' style={{ fontSize: '2.5em', }}>Warto wybrać MAPOL</Header>
            <p style={{ fontSize: '1.33em', }}>Może tu jakiś tekst (albo w ogóle wywalić nagłówek)</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign='center'>
          <Grid.Column>
            <Icon name='money bill alternate' color='orange' circular size='huge'/>
            <Header as='h3' style={{ fontSize: '1.5em', textTransform: 'uppercase', }}>Płatność gotówką</Header>
            <p style={{ fontSize: '1.33em', }}>Przy większych ilościach możliwość negocjacji ceny</p>
          </Grid.Column>
          <Grid.Column>
            <Icon name='dolly flatbed' color='orange' circular size='huge'/>
            <Header as='h3' style={{ fontSize: '1.5em', textTransform: 'uppercase', }}>Waga najazdowa</Header>
            <p style={{ fontSize: '1.33em', }}>Waga do ? ton pozwala szybko i sprawnie obsłużyć klienta</p>
          </Grid.Column>
          <Grid.Column>
            <Icon name='truck' color='orange' circular size='huge'/>
            <Header as='h3' style={{ fontSize: '1.5em', textTransform: 'uppercase', }}>Odbiór złomu</Header>
            <p style={{ fontSize: '1.33em', }}>Odbiór złomu u klienta już od ? ton.</p>
          </Grid.Column>
          <Grid.Column>
            <Icon name='dot circle outline' color='orange' circular size='huge'/>
            <Header as='h3' style={{ fontSize: '1.5em', textTransform: 'uppercase', }}>Skawina i okolice</Header>
            <p style={{ fontSize: '1.33em', }}>Działamy na terenie Skawiny, Krakowa i okolic</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted vertical style={{ padding: '3em 0em' }}>
      <Container>
        <Grid inverted stackable>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as='h4' inverted>F.H.U. MAPOL Maciej Polek</Header>
              <p>ul. Piłsudskiego 7, 32-050 Skawina</p>
              <p>696 171 183, 604 994 446</p>
            </Grid.Column>
            <Grid.Column width={3} floated='right'>
              <List link inverted>
                <List.Item as='a'>&#169;Adeptus Virtuales <Icon name='shekel'/> 2019</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout
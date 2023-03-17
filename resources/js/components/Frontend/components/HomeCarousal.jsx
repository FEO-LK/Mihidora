import React, { Component } from 'react';
import { Grid, Paper, Container } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
// import HeroBanner from "../../../../images/heroBanner.jpg";
// import heroBanner2 from "../../../../images/heroBanner2.jpg";

//export default function HomeCarousal(props) {
class HomeCarousal extends Component { 
  constructor(props) {
    super(props);
  }

  // var items = [
  //   {
  //       name: "Random Name #1",
  //       description: "Probably the most random thing you have ever seen!",
  //       image: HeroBanner
  //   },
  //   {
  //       name: "Random Name #2",
  //       description: "Hello World!",
  //       image: heroBanner2
  //   }
  // ]

  render() {
    return (
      <Grid container>
        <Carousel className='slide'>
          {
            this.props.setSliders.map( (item, i) => <Item key={i} item={item} /> )
          }
        </Carousel>
      </Grid>
    )
  }
}

export default HomeCarousal;
 
function Item(props)
{
  return (
    <Paper>
      <Container>
        <img src={'/storage/'+props.item} />
        {/* <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>

        <Button className="CheckButton">
          Check it out!
        </Button> */}
      </Container>
    </Paper>
  )
}

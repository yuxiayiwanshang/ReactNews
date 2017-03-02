
import React from 'react';
import {Tabs, Carousel} from 'antd';
export default class MobileCarousel extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
      <div className="carousel">
        <Carousel {...settings}>
          <div><img src="./app/images/CEGQJHUS00AO0001.jpg"></img></div>
          <div><img src="./app/images/CEH5PF7T00AO0001.jpg"></img></div>
           <div><img src="./app/images/CEH7LB1500AO0001.jpg"></img></div>
        </Carousel>
      </div>
		);
	};
}

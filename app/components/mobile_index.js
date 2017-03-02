import React from 'react';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import MobileCarousel from './Mobile_Carousel.js';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from './mobile_list';
export default class MobileIndex extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<div>
				<MobileHeader></MobileHeader>
        
           <Tabs>
   					<TabPane tab="头条" key="1">
              <MobileCarousel></MobileCarousel>
   						<MobileList count={10} type="top"/>
   					</TabPane>
   					<TabPane tab="社会" key="2">
   						<MobileList count={10} type="shehui"/>
   					</TabPane>
   					<TabPane tab="国内" key="3">
   						<MobileList count={10} type="guonei"/>
   					</TabPane>
   					<TabPane tab="国际" key="4">
   						<MobileList count={10} type="guoji"/>
   					</TabPane>
   					<TabPane tab="娱乐" key="5">
   						<MobileList count={15} type="yule"/>
   					</TabPane>
   				</Tabs>


				<MobileFooter></MobileFooter>
			</div>
		);
	};
}

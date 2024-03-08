// modules
import common from './common.js';
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import prizes from './modules/prizes.js';
import FullPageScroll from './modules/full-page-scroll';
import ThreeBackground from './3d/3d.js';
import PlaneView from "./3d/plane-view";

const planeView = new PlaneView();
planeView.init();

// init modules
common();
mobileHeight();
slider(planeView);
menu();
footer();
chat();
result();
form();
social();
prizes();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const view3d = new ThreeBackground(planeView);
view3d.start();

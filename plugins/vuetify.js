import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
        iconfont: 'md'
    },
    theme: {
        themes: {
          light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            tpwhite: '#FFFFFF',
            tplightgrey: '#E0E0E0',
            tpgrey: '#808080',
            tpblack: '#3B3B3B',
            tpteal: '#13B9A8',
            tpgreen: '#07C421',
            tppink: '#FAB4B7',
            tpred: '#EE1C25'
          },
        },
      }
});

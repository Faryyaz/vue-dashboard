import Vue from 'vue'

Vue.filter('formatNumber', (value: number) => {
    return new Intl.NumberFormat().format(value);
})
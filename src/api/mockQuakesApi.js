import axios from 'axios';
const init_lng = 174.885971;
const init_lat = -40.900557;

var filterData = [],quakes;

axios.get(`https://api.geonet.org.nz/quake?MMI=0`)
    .then(res => {
        const filterData = [];
        quakes = res.data.features.reduce((array, value) => {
            // if condition is our filter
            if (value.properties.mmi >= 2) {
                // what happens inside the filter is the map
                let time = value.properties.time;

                time = new Date(time);
                time = time.toString().split('GMT')[0];

                // time = time.split(".")[0].replace(/-/g, '/').replace(/T/g, '  ');
                value.properties.time = time;
                value.properties.magnitude = value.properties.magnitude.toFixed(1);
                value.properties.depth = value.properties.depth.toFixed(1) + ' km';
                array.push(value);
            }
            return array.slice(0, 10);
        }, filterData)


    })




class QuakesApi {
    static getAllQuakes() {
        return new Promise((resolve, reject) => setTimeout(() => resolve(quakes)), 3600);
    }

    static searchQuakeByName(qs) {
        return new Promise((resolve, reject) => {
            let result = quakes.filter(quake => {
                const fullName = `${quake.name.first.toLowerCase()} ${quake.name.last.toLowerCase()}`;
                return fullName.indexOf(qs.toLowerCase()) > -1;
            });

            resolve(result);
        })
    }
}

export default QuakesApi;
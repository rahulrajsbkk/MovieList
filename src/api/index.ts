import {createServer} from 'miragejs';
import * as dataOne from '../assets/json/CONTENTLISTINGPAGE-PAGE1.json';
import * as dataTwo from '../assets/json/CONTENTLISTINGPAGE-PAGE2.json';
import * as dataThree from '../assets/json/CONTENTLISTINGPAGE-PAGE3.json';

// Mock API To Get Data From JSON
export default function API() {
  if (window.server) {
    server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.get('/api/movies/:page', (schema, request) => {
        let page = request.params.page;
        switch (page) {
          case '1':
            return dataOne?.default?.page;
          case '2':
            return dataTwo?.default?.page;
          case '3':
            return dataThree?.default?.page;
          default:
            return null;
        }
      });
    },
  });
}

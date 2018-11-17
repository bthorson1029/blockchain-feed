import React, { Component } from 'react';
import logo from '../logo.svg';
import Resource from './Resource';

const data = {
  projects: [
    {
      'id': 1,
      'name': 'Basic Title 1',
      'date': 'January 2018',
      'type': 'UI/UX Design | Front End Development',
      'projectUrl': 'https://store.cadystudios.com/',
      'imageUrl': ('https://source.unsplash.com/weekly?water'),
      'projectImage': ('https://source.unsplash.com/weekly?water'),
      'brief': 'To build a responsive and intuitive photo ordering and appointment scheduling platform built on the Kentico CMS. The Kentico CMS backend wasd to allow marketing and manangment positions to make adjustments to the website quickly and easily.',
      'tech': 'HTML, CSS, JS, Bootstrap, Kentico, Sketch, InVision, Adobe Illustrator',
      'content': `CadyStudios is a family-owned school photography business that specializes in magazine-quality photos for students of all backgrounds and interests.`,
    },
    {
      'id': 2,
      'name': 'Basic Title 2',
      'date': 'March 2018',
      'type': 'UI/UX Design',
      'projectUrl': 'https://swpconnect.com/',
      'imageUrl': ('https://source.unsplash.com/weekly?water'),
      'projectImage': ('https://source.unsplash.com/weekly?water'),
      'brief': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab tenetur quo, harum temporibus veritatis sapiente aliquam. Perferendis reprehenderit dolorum eius, harum necessitatibus. Placeat voluptatum soluta, veniam impedit ullam temporibus. Laboriosam.',
      'tech': 'Sketch, InVision, Adobe Photoshop',
      'content': `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
											Incidunt recusandae, deleniti corporis sunt odit molestiae nobis nesciunt. 
											Porro corporis velit, fugit totam culpa nesciunt sed cupiditate tempora officiis impedit enim quia rerum ipsum excepturi perspiciatis eos? 
											Placeat quibusdam est nulla blanditiis, et odio quia id magni, animi libero! Possimus illo voluptatibus, voluptatem quas nobis quos. 
											Velit pariatur illum veritatis dolores eius cumque ipsum accusamus itaque inventore animi, cupiditate voluptates maiores quibusdam quas neque! 
											Quos delectus quasi, enim est mollitia unde sunt quisquam molestias, asperiores provident voluptates id. 
											Explicabo error, ullam, cupiditate impedit sed debitis optio in consequuntur exercitationem eum porro?`,
    },
    {
      'id': 3,
      'name': 'Basic Title 3',
      'date': 'November 2017',
      'type': 'UI/UX Design',
      'projectUrl': 'http://carzillaapp.com/',
      'imageUrl': ('https://source.unsplash.com/weekly?water'),
      'projectImage': ('https://source.unsplash.com/weekly?water'),
      'brief': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sit saepe, ducimus velit officia rem similique aliquid, quisquam magnam ea id fuga est facere dicta iste consequuntur minus adipisci maiores?',
      'tech': 'Sketch, InVision, Adobe Photoshop, Adobe Illustrator',
      'content': `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
											Enim nisi, fuga, illo cum dolore ratione nesciunt culpa, nemo rem sequi voluptate obcaecati! 
											Quisquam dolorum rem aliquam illum repudiandae, quia libero neque, cumque tempora esse excepturi incidunt id assumenda laudantium ea fuga ex eius adipisci labore asperiores molestiae vel. 
											Animi recusandae necessitatibus praesentium velit ipsum explicabo delectus a, fuga, reiciendis dolore, culpa laudantium illum omnis nobis aliquid nihil ea! 
											Laudantium voluptatibus, doloribus cupiditate eveniet, velit illum inventore, repellat ipsum, minima quaerat iusto tempora autem aspernatur! 
											A ipsam minima in nesciunt omnis iste nulla reiciendis ullam, totam ratione ipsum est possimus dolor.`,
    }
  ],
  all: function () { return this.resources },
  get: function (id) {
    const isResource = r => r.id === id;
    return this.resources.find(isResource)
  }
}



const url = 'https://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=6fb75bd662324da8ac93021ec495081e';
const req = new Request(url);
fetch(req)
  .then(function (response) { 
    let dataResponse = response.json();
    console.log(dataResponse); 
  });



class CardRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resources: []
    }
  }

  componentWillMount() {
    this.loadResources()
  }


  loadResources() {
    const resources = []
    data.projects.map(item => resources.push(item))
    this.setState({ resources })
    setTimeout(() => {
      console.log(this.state)
    }, 2000)
  }

  render() {
    const resourceCards = this.state.resources.map((resource, index) =>
      <div className="col-lg-4">
        <Resource
          id={resource.id}
          name={resource.name}
          date={resource.date}
          type={resource.type}
          imageUrl={resource.imageUrl}
          brief={resource.brief}
          tech={resource.tech}
          resourceUrl={resource.resourceUrl}
          key={index}
        />
      </div>)

    return (
      <div className="container-fluid">
        <div className="row">
          {resourceCards}
        </div>
      </div>
    )
  }
}



export default CardRow;

import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {

  articles=[
    {
      "source": {
          "id": "abc-news-au",
          "name": "ABC News (AU)"
      },
      "author": "Brittany Carter",
      "title": "The chicken or the egg argument in women's sport: why investment first equals revenue later",
      "description": "Recent studies show corporate sponsorship in women's elite sports isn't just a gesture, it's a savvy investment — as the Australian women's cricket team shows.",
      "url": "https://www.abc.net.au/news/2024-03-14/chicken-or-the-egg-argument-womens-sport-investment-vs-revenue/103582764",
      "urlToImage": "https://live-production.wcms.abc-cdn.net.au/33c130f7fd281b7c8cf6147c783887b0?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=0&width=862&height=485&imformat=generic",
      "publishedAt": "2024-03-13T21:46:36Z",
      "content": "\"Don't read the comments\" is common advice shared among women's sports fans when equal pay or major investment is announced for female athletes.\r\nIt's here you'll often find the naysayers critiquing … [+13197 chars]"
  },
  {
      "source": {
          "id": "news24",
          "name": "News24"
      },
      "author": null,
      "title": "News24 | India's Pant says doctors considered leg amputation after car crash",
      "description": "Star Indian wicketkeeper-batsman Rishabh Pant says that doctors raised the prospect of amputating his leg after the serious car crash that threatened to end his cricket career.",
      "url": "https://www.news24.com/sport/cricket/indias-pant-says-doctors-considered-leg-amputation-after-car-crash-20240313",
      "urlToImage": null,
      "publishedAt": "2024-03-13T14:01:10",
      "content": "Star Indian wicketkeeper-batsman Rishabh Pant says that doctors raised the prospect of amputating his leg after the serious car crash that threatened to end his cricket career."
  },
  {
      "source": {
          "id": "espn-cric-info",
          "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  },
  {
      "source": {
          "id": "espn-cric-info",
          "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  }
]


  constructor(){
    super();
    console.log("Hello I am the constructor  from news Components");
    this.state = {
      articles: [],
      loading: false,
      page:1

    }
  }
  
    async componentDidMount(){
    console.log("cdm");

    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0385a45146fd4ba88ef9de93646a72e4";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles})

  }

   handlePrevClick = async()=>{
      console.log("Previous");

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0385a45146fd4ba88ef9de93646a72e4&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      // this.setState({articles: parsedData.articles})
  
      this.setState({
        page: this.state.page-1,
        articles: parsedData.articles

      })
  
  }

  handleNextClick = async ()=>{

    console.log("Next");
    if(this.state.page+1> Math.ceil(this.state.totalResults/20)){

    }
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0385a45146fd4ba88ef9de93646a72e4&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    // this.setState({articles: parsedData.articles})

    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles
    })

  }


  render() {
    return (
      <div className = "container my-3">
        
        <h1>News Monkeynews - Top HeadLines</h1>
       

        <div className="row my-4">  
        {this.state.articles.map((element)=>{

          return  <div className="col-md-4"  key={element.url}>
                <NewsItems title={!element.title?element.title:""} description={!element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}        
           
        </div>
        
        <div className="cotainer d-flex justify-content-between">
            <button  disabled={this.state.page<=1}   type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      

      </div>
    )
  }
}

export default News

import React, {Component} from "react"
import "./style.css"


class MemeGenerator extends Component {
	constructor() {
		super()
		this.state ={
			topText:"",
			bottomText:"",
			randomImg: "https:\/\/i.imgflip.com\/30b1gx.jpg",
			allMemeImg: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		fetch("https://api.imgflip.com/get_memes")
		.then(response => response.json())
		.then(response => {
			const {memes} = response.data
			this.setState({allMemeImg: memes})
			
		})
	}
	
	handleChange(event) {
		const {name,value} = event.target
		this.setState({ [name]:value })
		
	}
	
	handleSubmit(event) {
		event.preventDefault()
		const randNum = Math.floor(Math.random() * this.state.allMemeImg.length)
		const randMemeImg = this.state.allMemeImg[randNum].url
		this.setState({ randomImg: randMemeImg })
	}
	
	render() {
		return(
		<div>
			<form onSubmit ={this.handleSubmit}>
				<input
					type="text"
					name="topText"
					placeholder="TopText"
					value = {this.state.topText}
					onChange= {this.handleChange}
				/>
				
				<input
					type="text"
					name="bottomText"
					placeholder="BottomText"
					value = {this.state.bottomText}
					onChange= {this.handleChange}
				/>
				
				<button>Gen</button>
				
			</form>
			<div >
				<img className="img-size" src={this.state.randomImg} alt="" />
				<h2 className="top">{this.state.topText}</h2>
				<h2 className="bottom">{this.state.bottomText}</h2>
			</div>
		</div>
		)
	}
}

export default MemeGenerator
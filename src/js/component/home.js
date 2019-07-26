import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: []
		};
	}
	componentDidMount() {
		// this.pauseBtn.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}
	render() {
		return (
			<ul className="list-group mx-1">
				{this.state.songs.map((item, index) => {
					return (
						<div key={index}>
							<li className="list-group-item m-1">
								{item.name}
								<audio
									type="audio/mp3"
									src={
										"https://assets.breatheco.de/apis/sound/" +
										this.state.songs[index].url
									}
								/>
							</li>
						</div>
					);
				})}
			</ul>
		);
	}
}

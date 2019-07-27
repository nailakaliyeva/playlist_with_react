import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			clicked: "play"
		};
	}
	componentDidMount() {
		// this.pauseBtn.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}

	playSong(index) {
		if (this.state.clicked == "play") {
			document.querySelector("#audio" + index).play();
			this.setState({ clicked: "pause" });
		}
		//this.setState({ clicked: "play" });
	}

	pauseSong(index) {
		//	this.setState({ clicked: "pause" });
		if (this.state.clicked == "pause") {
			document.querySelector("#audio" + index).pause();
			this.setState({ clicked: "play" });
		} //else this.setState({ clicked: "play" });
	}

	render() {
		return (
			<ul className="list-group mx-1">
				{this.state.songs.map((item, index) => {
					return (
						<div key={index} onClick={() => this.pauseSong(index)}>
							<li
								className="list-group-item m-1"
								onClick={() => this.playSong(index)}>
								{item.name}
								<audio
									id={"audio" + index}
									type="audio/mp3"
									ref={this.music}
									src={
										"https://assets.breatheco.de/apis/sound/" +
										this.state.songs[index].url
									}
								/>
							</li>
						</div>
					);
				})}
				<div className="buttons d-flex justify-content-around">
					<button type="button" className="btn btn-primary btn-lg">
						Previous
					</button>

					<span className="playBtn">
						<i className="fas fa-play fa-5x" />
					</span>

					<span className="pauseBtn">
						<i className="fas fa-pause fa-5x" />
					</span>

					<button type="button" className="btn btn-success btn-lg">
						Next
					</button>
				</div>
			</ul>
		);
	}
}

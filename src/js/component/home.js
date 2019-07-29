import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			clicked: "play",
			playingNow: false
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}

	playSong(index) {
		if (this.state.clicked == "play") {
			this.setState({ playingNow: true });
			if (this.state.playingNow == true) {
				document.querySelector(
					".unique" + index
				).style.backgroundColor = "black";
				this.setState({ playingNow: false });
			}
			document.querySelector("#audio" + index).play();
			this.setState({ clicked: "pause" });
			// if (this.state.playingNow === true) {
			// 	document.querySelector(".playBtn").style.display = "none";
			// 	document.querySelector(
			// 		".pauseBtn"
			// 	).onClick = document.querySelector("#audio" + index).pause();
			// 	this.setState({ playingNow: false });
			// }
		}
	}

	pauseSong(index) {
		if (this.state.clicked == "pause") {
			document.querySelector("#audio" + index).pause();
			this.setState({ clicked: "play" });
			if (this.state.playingNow == false) {
				document.querySelector(
					".unique" + index
				).style.backgroundColor = "yellow";
				this.setState({ playingNow: true });
			}
			// if (this.state.playingNow === false) {
			// 	document.querySelector(".pauseBtn").style.display = "none";
			// 	document.querySelector(
			// 		".playBtn"
			// 	).onClick = document.querySelector("#audio" + index).play();
			// 	this.setState({ playingNow: true });
			// }
		}
	}
	render() {
		return (
			<ul className="list-group mx-1">
				{this.state.songs.map((item, index) => {
					return (
						<div
							className={"unique" + index}
							key={index}
							onClick={() => this.pauseSong(index)}>
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

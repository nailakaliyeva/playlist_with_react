import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			playingNow: true
		};
	}
	componentDidMount() {
		document.querySelector(".playBtn").style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}

	playSong(index) {
		document.querySelector(".unique" + index).style.backgroundColor =
			"black";

		document.querySelector("#audio" + index).play();

		document.querySelector(".playBtn").style.display = "none";
		document.querySelector(".pauseBtn").style.display = "inline";
		document.querySelector(".pauseBtn").onclick = () =>
			this.pauseSong(index);
		this.setState({ playingNow: false });
	}

	pauseSong(index) {
		document.querySelector("#audio" + index).pause();
		document.querySelector(".unique" + index).style.backgroundColor =
			"yellow";
		//this.setState({ playingNow: true });

		document.querySelector(".pauseBtn").style.display = "none";
		document.querySelector(".playBtn").style.display = "inline";
		document.querySelector(".playBtn").onclick = () => this.playSong(index);
		this.setState({ playingNow: true });
	}

	render() {
		return (
			<ul className="list-group mx-1">
				{this.state.songs.map((item, index) => {
					return (
						<div
							className={"unique" + index}
							key={index}
							onClick={
								this.state.playingNow
									? () => this.playSong(index)
									: () => this.pauseSong(index)
							}>
							<li className="list-group-item m-1">
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

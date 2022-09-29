import Share from "../share/Share";
import "./feed.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../post/Post";

export default function Feed() {
	const [posts, setPosts] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		console.log("================================");
		console.log("Feed rendered.");
		console.log("================================");

		const fetchPosts = async () => {
			const res = await axios.get("posts/timeline/63305f5075e5e22640f2fcd2");
			setPosts(res.data);
		};
		fetchPosts();
	}, []);


	return (
		<div className="feed">
			<input type="text" onChange={e => setText(e.target.value)}/>
			<div className="feedWrapper">
				<Share/>
				{posts.map((p) => (
					<Post key={p.id} post={p}/>
				))}
			</div>
		</div>
	);
}
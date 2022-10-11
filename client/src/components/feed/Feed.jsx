import Share from "../share/Share";
import "./feed.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../post/Post";

export default function Feed({ username}) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username ? await axios.get("posts/profile/" + username) : await axios.get("posts/timeline/63365b551a23c179ec9675d1");
			setPosts(res.data);
		};
		fetchPosts();
	}, [username]);


	return (
		<div className="feed">
			<div className="feedWrapper">
				<Share />
				{posts.map((p) => (
					<Post key={p._id} post={p}/>
				))}
			</div>
		</div>
	);
}
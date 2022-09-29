import "./post.css";
import {MoreVert} from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Post({post}) {
	const [like, setLike] = useState(post.like);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await axios.get(`users/${post.userId}`);
			console.log("Users; ", res.data);
			setUser(res.data);
		};
		fetchUsers();
	}, []);

	const likeHandler = () => {
		setLike(isLiked ? like - 1 : like + 1)
		setIsLiked(!isLiked)
	}
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<img
							className="postProfileImg"
							src={user.profilePicture}
							alt=""
						/>
						<span className="postUsername">
			              {user.username}
			            </span>
						<span className="postDate">{post.date}</span>
					</div>
					<div className="postTopRight">
						<MoreVert/>
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={PF + post.photo} alt=""/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt=""/>
						<img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt=""/>
						<span className="postLikeCounter">{like} people like it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
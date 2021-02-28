import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { red } from "@material-ui/core/colors";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar} s
            src={props.data.faculty.photo}
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.data.faculty.name}
        subheader={<Moment fromNow>{props.data.posted_on}</Moment>}
      />
      <CardContent>
        <div className="nopadmar">
          <h4>{props.data.title}</h4>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.description.slice(0, 60) + "..."}
        </Typography>
        <div className="nopadmar">
          <span>Apply By</span>
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(props.data.applyBy).toDateString()}
          </Typography>
          <span>Duration</span>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.duration}
          </Typography>
          <span>Skills</span>
          <div id="tags-skill">
            {props.data.skillsRequired.map((skill) => {
              return (
                <span>
                  <Chip label={skill}></Chip>{" "}
                </span>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Link to={"/internship/" + props.data._id}>more info</Link>
      </CardActions>
    </Card>
  );
}

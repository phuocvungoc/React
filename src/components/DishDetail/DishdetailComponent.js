import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

function RenderComments({ comments }) {
  if (comments != null)
    return (
      <div className="m-5">
        <h4>Comments</h4>
        {comments.map((comments) => {
          return (
            <div className="mt-5 m-3">
              <div>{comments.comment}</div>
              <div>
                ---{comments.author}---
                {dateFormat(comments.date, "dd/mmm/yyyy")}
              </div>
            </div>
          );
        })}
      </div>
    );
  else return <div></div>;
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;

import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import dateFormat from "dateformat";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  renderComment(dish) {
    if (dish != null)
      return (
        <div className="m-5">
          <h4>Comments</h4>
          {dish.comments.map((com) => {
            return (
              <div className="mt-5 m-3">
                <div>{com.comment}</div>
                <div>
                  ---{com.author}---{dateFormat(com.date, "dd/mmm/yyyy")}
                </div>
              </div>
            );
          })}
        </div>
      );
    else return <div></div>;
  }

  renderDish(dish) {
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

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderDish(this.props.dish)}
          {this.renderComment(this.props.dish)}
        </div>
      </div>
    );
  }
}

export default DishDetail;

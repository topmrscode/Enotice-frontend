import React from "react";
import { Card, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../common/CustomBootstrap";
import Timestamp from "react-timestamp";

const ProductList = ({ product, isSelect, onCheckItem }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id}>
        <Card
          onClick={(event) => onCheckItem(event, product._id)}
          className={classnames("d-flex flex-row", {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink
                to={`/organization/products/${product._id}`}
                className="w-40 w-sm-100"
              >
                <p className="list-item-heading mb-1 truncate">
                  {product.reference}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <Timestamp Data={product.createdAt} />
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product._id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default ProductList;

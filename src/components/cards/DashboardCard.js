import React from "react";
import { Card, CardBody } from "reactstrap";

const DashboardCard = ({ icon = "iconsminds-bell", title = "title" }) => {
  return (
    <Card className={"progress-banner"}>
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div style={{ margin: "auto", textAlign: "center" }}>
          <i
            className={`${icon} mr-2 text-primary align-text-bottom d-inline-block`}
          />
          <div>
            <p className="lead text-primary">{title}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default DashboardCard;

import React, { useEffect, useState } from "react";
import CardComponent from "../components/Card";
import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Unexpected Error Occured", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = (id, updatedValues) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...updatedValues } : user
      )
    );
  };
  if (loading) {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Row>
          {users?.length > 0 &&
            users.map((user) => {
              return (
                <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
                  <CardComponent
                    profile={{
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      website: user.website,
                    }}
                    username={user.username}
                    id={user.id}
                    details={[
                      {
                        icon: (
                          <MailOutlined
                            style={{ fontSize: "18px", color: "#000000A6" }}
                          />
                        ),
                        text: user.email,
                      },
                      {
                        icon: (
                          <PhoneOutlined
                            style={{ fontSize: "18px", color: "#000000A6" }}
                          />
                        ),
                        text: user.phone,
                      },
                      {
                        icon: (
                          <GlobalOutlined
                            style={{ fontSize: "18px", color: "#000000A6" }}
                          />
                        ),
                        text: user.website,
                      },
                    ]}
                    onDelete={() => handleDelete(user.id)}
                    onUpdate={handleUpdate}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;

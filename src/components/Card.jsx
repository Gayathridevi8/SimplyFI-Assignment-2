import { useMemo, useState } from "react";
import {
  DeleteFilled,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import ModalComponent from "./Modal";

const CardComponent = ({
  profile,
  details,
  onDelete,
  onUpdate,
  username,
  id,
}) => {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatar = useMemo(() => {
    return createAvatar(lorelei, { seed: username, size: 200 }).toDataUri();
  }, [username]);

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <>
      <Card
        style={{
          margin: 15,
          borderColor: "#e8e8e8",
          borderRadius: 2,
        }}
        cover={
          <div className="cardHeadImage bg-[#f5f5f5] !flex items-center justify-center">
            <img src={avatar} alt="Avatar" />
          </div>
        }
        actions={[
          liked ? (
            <HeartFilled
              onClick={toggleLike}
              key="liked"
              style={{ fontSize: "20px", color: "#ff0000" }}
            />
          ) : (
            <HeartOutlined
              onClick={toggleLike}
              key="not-liked"
              style={{ fontSize: "20px", color: "#ff0000" }}
            />
          ),
          <EditOutlined
            key="edit"
            style={{ fontSize: "20px" }}
            onClick={() => setIsModalOpen(true)}
          />,
          <DeleteFilled
            key="ellipsis"
            style={{ fontSize: "20px" }}
            onClick={onDelete}
          />,
        ]}
      >
        <h3 className="mb-[9px] mt-0 text-[#000000D9] font-medium text-[1.17rem]">
          {profile.name}
        </h3>
        {details?.length > 0 &&
          details.map((detail) => {
            return (
              <div key={detail.email} className="flex items-start">
                {detail.icon}
                <p className="ml-[10px] mb-[5px] text-[#000000A6] leading-[1.5]">
                  {detail.text}
                </p>
              </div>
            );
          })}
      </Card>

      <ModalComponent
        initialValues={profile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={(values) => {
          onUpdate(id, values);
        }}
      />
    </>
  );
};

export default CardComponent;

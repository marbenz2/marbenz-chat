import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { ChevronsRight, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (selectedUser) setIsOpen(false);
  }, [selectedUser]);

  const isCurrentUserSuperUser = authUser?.isSuperUser;

  let filteredUsers = isCurrentUserSuperUser
    ? users
    : users.filter((user) => user.isSuperUser);

  if (showOnlineOnly) {
    filteredUsers = filteredUsers.filter((user) =>
      onlineUsers.includes(user._id)
    );
  }

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`relative h-full ${
        isOpen ? "w-20" : "w-0"
      } border-none sm:w-20 lg:w-72 sm:border-r border-base-300 flex flex-col transition-all duration-200`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -right-12 btn btn-circle opacity-20 hover:opacity-100 sm:hidden z-30"
      >
        {isOpen ? (
          <ChevronsRight className="size-5 transform rotate-180" />
        ) : (
          <ChevronsRight className="size-5" />
        )}
      </button>
      <div
        className={`flex flex-col border-b border-base-300 w-full p-5 gap-2 ${
          isOpen ? "" : "hidden sm:flex"
        }`}
      >
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Kontakte</span>
        </div>
        {/* Online filter toggle */}
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Nur Online anzeigen</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length > 0 ? onlineUsers.length - 1 : 0} online)
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic ? user.profilePic : "/avatar.png"}
                alt={user.fullName}
                className="size-10 lg:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            Niemand ist Online
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;

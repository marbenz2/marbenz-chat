const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="size-20 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <img
                src="/logo-192x192.webp"
                alt="logo"
                className="rounded-full size-16"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">
          Hey! Willkommen beim MarBenz Chat!
        </h2>
        <p className="text-base-content/60">
          Hiermit lade ich Sie herzlichst ein mit mir zu chatten.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

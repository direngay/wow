{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx = {
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "start" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}

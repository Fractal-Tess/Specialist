export type DiscordServer = {
  id: string;
  name: string;
  iconUrl: string | null;
};

export type DiscordBot = {
  id: string;
  name: string;
  avatar: string | null;
};

export type DiscordUser = {
  username: string;
  id: string;
  avatarUrl: string | null;
};

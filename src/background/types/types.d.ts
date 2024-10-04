export type RedirectRule = {
  id: number;
  priority: number;
  action: {
    type: string;
    redirect: {
      url: string;
    };
  };
  condition: {
    urlFilter: string;
    resourceTypes: string[];
  };
};

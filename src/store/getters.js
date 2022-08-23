const getters = {
  // websiteName: (state) =>
  //   state.system.website.companyName + state.system.website.systemName,
  // websiteInfo: (state) => state.system.website,
  // avatar: (state) => state.user.avatar,
  userInfo: (state) => state.user.userInfo,
  token: (state) => state.user.token,
  openPages: (state) => state.system.openPages,
  activePageName: (state) => state.system.activePage?.name,
  notInLayout: (state) => state.system.notInLayout || [],
  roles: (state) => state.user.roles,
  userAuthMenus: (state) => state.system.authMenus || [],
  isSubsidiary: (state) => state.user.userInfo.unitType === 2,
  orgId: (state) => state.user.userInfo.orgId
};
export default getters;

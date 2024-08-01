import styled from "styled-components";

export const HeaderWrapper = styled.header`
  height: 80px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

export const ProjectName = styled.div`
  font-size: 2rem;
  flex-grow: 1;
`;

export const MainNav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: ${(props) => props.theme.colors.background};
    text-decoration: none;
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }

  .active {
    border-bottom: 2px solid ${(props) => props.theme.colors.background};
  }
`;

export const LogoutButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.background};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 8px;
`;

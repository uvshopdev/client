import styled from "styled-components";

export const Content = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 60px 0 40px;
	display: flex;
	flex-direction: column;
	gap: 60px;

	@media (max-width: 990px) {
		padding: 40px 0;
		gap: 40px;
	}
`;

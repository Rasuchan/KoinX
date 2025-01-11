import React from 'react';
import styled from 'styled-components';

// Styled Components
const TeamSection = styled.section`
  padding: 40px;
  background-color: #f5f8fa;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TeamCard = styled.div`
  display: flex;
  background-color: #e6f1fb;
  border-radius: 8px;
  padding: 20px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Designation = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 14px;
  color: #666;
`;

const Team = () => {
  return (
    <TeamSection>
      <Title>Team</Title>
      <Description>
        Meet our dedicated team of professionals who are committed to driving innovation, growth, and excellence in everything we do.
      </Description>

      <TeamWrapper>
        <TeamCard>
          <Avatar src="https://via.placeholder.com/80" alt="John Smith" />
          <Info>
            <Name>John Smith</Name>
            <Designation>Chief Executive Officer</Designation>
            <Bio>
              John leads our company with a focus on long-term strategy, growth, and innovation. With over 15 years of leadership experience in the tech industry, he is passionate about building products that make a real impact.
            </Bio>
          </Info>
        </TeamCard>

        <TeamCard>
          <Avatar src="https://via.placeholder.com/80" alt="Elina Williams" />
          <Info>
            <Name>Elina Williams</Name>
            <Designation>Chief Technology Officer</Designation>
            <Bio>
              Elina is responsible for overseeing the technological vision and development of our platforms. Her expertise in software engineering and AI ensures our tech solutions are cutting-edge and scalable.
            </Bio>
          </Info>
        </TeamCard>

        <TeamCard>
          <Avatar src="https://via.placeholder.com/80" alt="David Johnson" />
          <Info>
            <Name>David Johnson</Name>
            <Designation>Chief Marketing Officer</Designation>
            <Bio>
              David drives the company’s marketing strategy, ensuring our brand message reaches the right audience. With a strong background in digital marketing, he brings creativity and data-driven insights to every campaign.
            </Bio>
          </Info>
        </TeamCard>
      </TeamWrapper>
    </TeamSection>
  );
};

export default Team;

import { Container, Text, VStack, Heading, Box, Image, SimpleGrid, Link, Flex, Button, HStack } from "@chakra-ui/react";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Recipe Sharing Website</Heading>
        <Text fontSize="xl">Discover and share your favorite recipes!</Text>
        <Button colorScheme="teal" size="lg" onClick={() => navigate("/submit-recipe")}>Submit a Recipe</Button>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
          {recipes.map((recipe, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={recipe.image} alt={recipe.title} />
              <Box p={6}>
                <Heading as="h3" size="lg" mb={4}>{recipe.title}</Heading>
                <HStack spacing={1} mb={4}>
                  {Array(5).fill("").map((_, i) => (
                    <FaStar key={i} color={i < calculateAverageRating(recipe.ratings) ? "gold" : "gray"} />
                  ))}
                  <Text>({calculateAverageRating(recipe.ratings)})</Text>
                </HStack>
                <Link href={recipe.link} color="teal.500" isExternal>
                  View Recipe <FaExternalLinkAlt />
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
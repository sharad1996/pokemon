import {
  Box,
  Chip,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavouriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { PokemonType } from "./Contexts/PokemonProvider";
import { IChainLink } from "pokeapi-typescript";
import React, { memo, Suspense, useState } from "react";
const PokemonAbout = React.lazy(() => import("./PokemonAbout"));
const PokemonStats = React.lazy(() => import("./PokemonStats"));
const PokemonEvolution = React.lazy(() => import("./PokemonEvolution"));
const PokemonMoves = React.lazy(() => import("./PokemonMoves"));


interface PokemonModalProps {
  name: string;
  types: PokemonType[];
  imageUrl: string;
  experience: number;
  height: number;
  weight: number;
  moves: any[];
  abilities: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  description: string;
  evolutions: IChainLink[];
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onClose: () => void;
}

const IMAGE_HEIGHT = 350;

const PokemonModal: React.FC<PokemonModalProps> = ({
  name,
  types,
  imageUrl,
  experience,
  height,
  weight,
  moves,
  abilities,
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
  description,
  evolutions,
  isFavourite,
  onToggleFavourite,
  onClose,
}) => {
  const [currentTab, setCurrentTab] = useState("about");

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setCurrentTab(newValue);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Paper sx={{ borderRadius: "30px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            pt: 4,
          }}
        >
          <IconButton onClick={onClose} color="inherit">
            <ArrowBackRoundedIcon />
          </IconButton>

          <IconButton onClick={onToggleFavourite} color="inherit">
            {isFavourite ? (
              <FavouriteRoundedIcon />
            ) : (
              <FavouriteBorderRoundedIcon />
            )}
          </IconButton>
        </Box>

        <Box
          sx={{
            backgroundImage: 'url("/pokeball.svg")',
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
          }}
        >
          <DialogTitle>{name}</DialogTitle>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              px: 3,
            }}
          >
            {types.map((type) => (
              <Chip key={type} label={type} />
            ))}
          </Stack>

          <Box height={IMAGE_HEIGHT - 100} />
        </Box>
      </Paper>

      <Paper
        variant="white"
        sx={{
          flex: 1,
          borderRadius: "30px",
          position: "relative",
          marginTop: "-2rem",
          minHeight: "5rem",
          pb: 2,
          px: 4,
          paddingTop: "75px",
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          sx={{
            position: "absolute",
            left: "50%",
            height: IMAGE_HEIGHT,
            marginTop: `${-IMAGE_HEIGHT}px`,
            transform: "translateX(-50%)",
          }}
        />

        <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
          <Tab value="about" label="About" />
          <Tab value="base-stats" label="Base Stats" />
          <Tab value="evolution" label="Evolution" />
          <Tab value="moves" label="Moves" />
        </Tabs>

        <Box py={2}>
          {currentTab === "about" && (
            <Suspense fallback={<Box>Loading...</Box>}>
              <PokemonAbout
                experience={experience}
                height={height}
                weight={weight}
                abilities={abilities}
                description={description}
              />
            </Suspense>
          )}
          {currentTab === "base-stats" && (
            <Suspense fallback={<Box>Loading...</Box>}>
              <PokemonStats
                hp={hp}
                attack={attack}
                defense={defense}
                specialAttack={specialAttack}
                specialDefense={specialDefense}
                speed={speed}
              />
            </Suspense>
          )}
          {currentTab === "evolution" && (
            <Suspense fallback={<Box>Loading...</Box>}>
              <PokemonEvolution name={name} evolutions={evolutions} />
            </Suspense>
          )}
          {currentTab === "moves" && (
            <Suspense fallback={<Box>Loading...</Box>}>
              <PokemonMoves moves={moves} />
            </Suspense>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(PokemonModal);

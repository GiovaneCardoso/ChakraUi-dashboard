import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCOuntOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return index + from + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCOuntOfRegisters,
  onPageChange,
  currentPage = 1,
  registerPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCOuntOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : [];
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify={"space-between"}
      alignItems="center"
      spacing="6"
    >
      <Box>
        <strong>
          {currentPage == 1 ? 0 : (currentPage - 1) * registerPerPage}
        </strong>{" "}
        -{" "}
        <strong>
          {currentPage == 1 ? registerPerPage : currentPage * registerPerPage}
        </strong>{" "}
        de <strong>{totalCOuntOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + SIBLINGS_COUNT && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + SIBLINGS_COUNT && (
              <Text color={"gray.300"} w="8" textAlign={"center"}>
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}
        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />
        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <Text color={"gray.300"} w="8" textAlign={"center"}>
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

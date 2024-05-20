-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Трв 20 2024 р., 17:00
-- Версія сервера: 10.4.32-MariaDB
-- Версія PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `eenglish_database`
--

-- --------------------------------------------------------

--
-- Структура таблиці `attempts_to_pass_topic_test`
--

CREATE TABLE `attempts_to_pass_topic_test` (
  `attempt_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_test_id` int(11) NOT NULL,
  `attempt_result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `attempts_to_pass_topic_test`
--

INSERT INTO `attempts_to_pass_topic_test` (`attempt_id`, `user_id`, `topic_test_id`, `attempt_result`) VALUES
(1, 145, 1, 6),
(2, 145, 2, 4),
(3, 145, 1, 0),
(4, 145, 3, 2),
(5, 144, 1, 6),
(6, 145, 2, 6),
(7, 145, 1, 0),
(8, 145, 2, 1),
(9, 145, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблиці `topic_information`
--

CREATE TABLE `topic_information` (
  `topic_id` int(11) NOT NULL,
  `topic_name` varchar(100) NOT NULL,
  `topic_description` varchar(400) NOT NULL,
  `topic_creator_information` int(11) NOT NULL,
  `topic_main_information` text NOT NULL,
  `topic_test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `topic_information`
--

INSERT INTO `topic_information` (`topic_id`, `topic_name`, `topic_description`, `topic_creator_information`, `topic_main_information`, `topic_test_id`) VALUES
(1, 'name of first topic', 'Description of first topic', 146, '0 dsdsds', 1),
(2, 'name of second topic', 'description of second topic', 146, '0 gdsagdgsad agsgd gsadfgasffsa dhgsfa fdgafsh ', 2);

-- --------------------------------------------------------

--
-- Структура таблиці `topic_test_information`
--

CREATE TABLE `topic_test_information` (
  `topic_test_id` int(11) NOT NULL,
  `topic_question_one` text NOT NULL,
  `topic_answer_one` text NOT NULL,
  `topic_question_two` text NOT NULL,
  `topic_answer_two` text NOT NULL,
  `topic_question_three` text NOT NULL,
  `topic_answer_three` text NOT NULL,
  `topic_question_four` text NOT NULL,
  `topic_answer_four` text NOT NULL,
  `topic_question_five` text NOT NULL,
  `topic_answer_five` text NOT NULL,
  `topic_question_six` text NOT NULL,
  `topic_answer_six` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `topic_test_information`
--

INSERT INTO `topic_test_information` (`topic_test_id`, `topic_question_one`, `topic_answer_one`, `topic_question_two`, `topic_answer_two`, `topic_question_three`, `topic_answer_three`, `topic_question_four`, `topic_answer_four`, `topic_question_five`, `topic_answer_five`, `topic_question_six`, `topic_answer_six`) VALUES
(0, 'hfgsdfsgfsfdsfgsdfdsgj', 'sss', 'sss', 'sss', 's', 's', 's', 's', 's', 's', 'ss', 's'),
(1, 'question one', 'answer one', 'question two', 'answer two', 'question three', 'answer three', 'question four', 'answer four', 'question five', 'answer five', 'question six', 'answer six'),
(2, 'question one2', 'answer one', 'question two', 'answer two', 'question three', 'answer three', 'question four', 'answer four', 'question five2', '2answer five', 'question six', 'answer six'),
(3, 'dsadsadsaasdsaddsa', 'ds', 'ds', 'ds', 'ds', 'ds', 'ds', 'ds', 'dsds', 'ds', 'ds', 'ds');

-- --------------------------------------------------------

--
-- Структура таблиці `user_information`
--

CREATE TABLE `user_information` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(35) NOT NULL,
  `user_surname` varchar(35) NOT NULL,
  `user_gender` varchar(20) NOT NULL,
  `user_login` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `user_permition_level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `user_information`
--

INSERT INTO `user_information` (`user_id`, `user_name`, `user_surname`, `user_gender`, `user_login`, `user_password`, `user_permition_level`) VALUES
(0, '321', '32232', '', 'dsdsa', 'dsadw22', 1),
(3, '32', '32', '', 'ds', 'ds', 1),
(125, '3213', '2131', '', '2321', '3213', 1),
(126, '321312', '32', '', '13213', '12321', 1),
(127, '123', '123', '', '123', '123', 1),
(128, 'Назарій', 'Москалюк', '', 'testlogin', 'testpassword', 2),
(137, '1', '1', '', '1', '1', 2),
(138, '3213', '3213', '', '3213', '3213', 2),
(139, '332', '332', '', '332', '332', 2),
(140, '321321', '321321', '', '321321', '321321', 1),
(141, '321321321', '321321321', '', '321321321', '32132131', 1),
(142, '3333', '33333', '', '3333', '33333333', 1),
(143, '9', '9', 'Хлопець', '9', '9', 1),
(144, '99', '99', 'Хлопець', '99', '99', 1),
(145, '88', '88', 'Дівчина', '88', '88', 1),
(146, 'admin', 'admin', 'Хлопець', 'admin', 'admin', 2);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `attempts_to_pass_topic_test`
--
ALTER TABLE `attempts_to_pass_topic_test`
  ADD PRIMARY KEY (`attempt_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `topic_test_id` (`topic_test_id`);

--
-- Індекси таблиці `topic_information`
--
ALTER TABLE `topic_information`
  ADD PRIMARY KEY (`topic_id`),
  ADD KEY `topic_test_id` (`topic_test_id`);

--
-- Індекси таблиці `topic_test_information`
--
ALTER TABLE `topic_test_information`
  ADD PRIMARY KEY (`topic_test_id`);

--
-- Індекси таблиці `user_information`
--
ALTER TABLE `user_information`
  ADD PRIMARY KEY (`user_id`);

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `attempts_to_pass_topic_test`
--
ALTER TABLE `attempts_to_pass_topic_test`
  ADD CONSTRAINT `attempts_to_pass_topic_test_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_information` (`user_id`),
  ADD CONSTRAINT `attempts_to_pass_topic_test_ibfk_2` FOREIGN KEY (`topic_test_id`) REFERENCES `topic_test_information` (`topic_test_id`);

--
-- Обмеження зовнішнього ключа таблиці `topic_information`
--
ALTER TABLE `topic_information`
  ADD CONSTRAINT `topic_information_ibfk_1` FOREIGN KEY (`topic_test_id`) REFERENCES `topic_test_information` (`topic_test_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

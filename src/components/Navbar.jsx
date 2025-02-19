/* eslint-disable react/prop-types */
import { useState } from "react";
import { BadgeCheckIcon, ChevronDownIcon } from "lucide-react";

export default function Navbar({ streak, earnedBadges, claimBadge }) {
	const [showDropdown, setShowDropdown] = useState(false);

	const scoreBadges = earnedBadges.filter(
		(badge) => badge.score !== undefined
	);
	const streakBadges = earnedBadges.filter(
		(badge) => badge.streak !== undefined
	);

	const scoreBadgesUnclaimed = scoreBadges.filter((badge) => !badge.claimed);
	const scoreBadgesClaimed = scoreBadges.filter((badge) => badge.claimed);
	const streakBadgesUnclaimed = streakBadges.filter(
		(badge) => !badge.claimed
	);
	const streakBadgesClaimed = streakBadges.filter((badge) => badge.claimed);

	const handleClaimBadge = (badgeId) => {
		claimBadge(badgeId);
	};

	return (
		<nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center shadow-xl">
			<div className="text-xl sm:text-2xl font-extrabold tracking-wide">
				Quiz Master
			</div>
			<div className="flex items-center space-x-4 sm:space-x-6">
				<div className="flex items-center space-x-2">
					<span className="text-xs sm:text-sm">Streak:</span>
					<span className="font-semibold text-yellow-300 text-sm sm:text-base">
						{streak} 🔥
					</span>
				</div>
				{/* Badge Dropdown */}
				<div className="relative">
					<button
						className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors duration-200 relative"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						{scoreBadgesUnclaimed.length +
							streakBadgesUnclaimed.length >
							0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
								{scoreBadgesUnclaimed.length +
									streakBadgesUnclaimed.length}
							</span>
						)}
						<BadgeCheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
						<span>Badges</span>
						<ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4" />
					</button>

					{showDropdown && (
						<div className="absolute right-0 mt-2 w-80 sm:w-96 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto z-50 border border-gray-700">
							{/* Score Badges Section */}
							<div>
								<h3 className="font-bold border-b pb-1 mb-3 text-base sm:text-lg tracking-wide text-gray-200">
									Score Badges
								</h3>

								<div>
									<h4 className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">
										Unclaimed
									</h4>
									{scoreBadgesUnclaimed.length > 0 ? (
										scoreBadgesUnclaimed.map((badge) => (
											<div
												key={badge.id}
												className="flex justify-between items-center p-2 sm:p-3 bg-gray-700 rounded-lg mb-2 shadow-md"
											>
												<div className="flex items-center space-x-2 sm:space-x-3">
													<BadgeCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
													<div>
														<div className="text-white font-medium text-sm sm:text-base">
															{badge.title}{" "}
															{badge.icon}
														</div>
														<div className="text-xs text-gray-400">
															Score: {badge.score}
														</div>
														<div className="text-xs text-gray-400">
															Awarded:{" "}
															{new Date(
																badge.date
															).toLocaleString()}
														</div>
													</div>
												</div>
												<button
													onClick={() =>
														handleClaimBadge(
															badge.id
														)
													}
													className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs transition-all"
												>
													Claim
												</button>
											</div>
										))
									) : (
										<p className="text-xs text-gray-500">
											No unclaimed score badges
										</p>
									)}
								</div>

								<div className="mt-3">
									<h4 className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">
										Claimed
									</h4>
									{scoreBadgesClaimed.length > 0 ? (
										scoreBadgesClaimed.map((badge) => (
											<div
												key={badge.id}
												className="flex justify-between items-center p-2 sm:p-3 bg-gray-800 rounded-lg mb-2 shadow-md"
											>
												<div className="flex items-center space-x-2 sm:space-x-3">
													<BadgeCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
													<div>
														<div className="text-white font-medium text-sm sm:text-base">
															{badge.title}{" "}
															{badge.icon}
														</div>
														<div className="text-xs text-gray-400">
															Score: {badge.score}
														</div>
														<div className="text-xs text-gray-400">
															Awarded:{" "}
															{new Date(
																badge.date
															).toLocaleString()}
														</div>
													</div>
												</div>
												<button className="bg-gray-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs cursor-not-allowed">
													Claimed
												</button>
											</div>
										))
									) : (
										<p className="text-xs text-gray-500">
											No claimed score badges
										</p>
									)}
								</div>
							</div>

							{/* Streak Badges Section */}
							<div className="mt-4 sm:mt-6">
								<h3 className="font-bold border-b pb-1 mb-3 text-base sm:text-lg tracking-wide text-gray-200">
									Streak Badges
								</h3>

								<div>
									<h4 className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">
										Unclaimed
									</h4>
									{streakBadgesUnclaimed.length > 0 ? (
										streakBadgesUnclaimed.map((badge) => (
											<div
												key={badge.id}
												className="flex justify-between items-center p-2 sm:p-3 bg-gray-700 rounded-lg mb-2 shadow-md"
											>
												<div className="flex items-center space-x-2 sm:space-x-3">
													<BadgeCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
													<div>
														<div className="text-white font-medium text-sm sm:text-base">
															{badge.title}{" "}
															{badge.icon}
														</div>
														<div className="text-xs text-gray-400">
															Streak:{" "}
															{badge.streak}
														</div>
														<div className="text-xs text-gray-400">
															Awarded:{" "}
															{new Date(
																badge.date
															).toLocaleString()}
														</div>
													</div>
												</div>
												<button
													onClick={() =>
														handleClaimBadge(
															badge.id
														)
													}
													className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs transition-all"
												>
													Claim
												</button>
											</div>
										))
									) : (
										<p className="text-xs text-gray-500">
											No unclaimed streak badges
										</p>
									)}
								</div>

								<div className="mt-3">
									<h4 className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">
										Claimed
									</h4>
									{streakBadgesClaimed.length > 0 ? (
										streakBadgesClaimed.map((badge) => (
											<div
												key={badge.id}
												className="flex justify-between items-center p-2 sm:p-3 bg-gray-800 rounded-lg mb-2 shadow-md"
											>
												<div className="flex items-center space-x-2 sm:space-x-3">
													<BadgeCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
													<div>
														<div className="text-white font-medium text-sm sm:text-base">
															{badge.title}{" "}
															{badge.icon}
														</div>
														<div className="text-xs text-gray-400">
															Streak:{" "}
															{badge.streak}
														</div>
														<div className="text-xs text-gray-400">
															Awarded:{" "}
															{new Date(
																badge.date
															).toLocaleString()}
														</div>
													</div>
												</div>
												<button className="bg-gray-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs cursor-not-allowed">
													Claimed
												</button>
											</div>
										))
									) : (
										<p className="text-xs text-gray-500">
											No claimed streak badges
										</p>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
